from rest_framework.views import APIView  
from rest_framework.response import Response 
  
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status
from .models import Conversation, Message
from .serializers import ConversationSerializer , MessageSerializer
 
from .ai import generate_response, build_conversation_context, generate_conversation_title
from django.shortcuts import get_object_or_404

from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView
)

class ConversationListCreateView(ListCreateAPIView):

    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class MessageListView(ListAPIView):

    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        conversation = get_object_or_404(
            Conversation,
            id=self.kwargs["pk"],
            user=self.request.user
        )

        return conversation.messages.order_by(
            "created_at"
        )
    
class ChatView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):

        conversation_id = request.data.get(
            "conversation_id"
        )

        user_message = request.data.get(
            "message"
        )


        if not user_message:

            return Response(
                {
                    "error": "message is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        # -----------------------------
        # Create new conversation
        # -----------------------------
        if not conversation_id:
            conversation = Conversation.objects.create(
                user=request.user,
                title="New Chat"
            )

        else:

            conversation = get_object_or_404(
                Conversation,
                id=conversation_id,
                user=request.user
            )


        # -----------------------------
        # Save user message
        # -----------------------------

        user_msg = Message.objects.create(

            conversation=conversation,

            role="user",

            content=user_message

        )


        # -----------------------------
        # Generate title
        # -----------------------------

        if conversation.title == "New Chat":

            title = generate_conversation_title(
                user_message
            )

            conversation.title = title

            conversation.save()


        # -----------------------------
        # Build context
        # -----------------------------

        context = (

            "You are a helpful AI assistant.\n\n"

            + build_conversation_context(
                conversation
            )

        )


        # -----------------------------
        # Gemini response
        # -----------------------------

        ai_reply = generate_response(
            context
        )


        assistant_msg = Message.objects.create(

            conversation=conversation,

            role="assistant",

            content=ai_reply

        )


        return Response(

            {

                "conversation_id":
                    conversation.id,


                "user_message": {

                    "id": user_msg.id,

                    "role": user_msg.role,

                    "content": user_msg.content,

                    "created_at":
                        user_msg.created_at

                },


                "assistant_message": {

                    "id": assistant_msg.id,

                    "role": assistant_msg.role,

                    "content": assistant_msg.content,

                    "created_at":
                        assistant_msg.created_at

                }

            },

            status=status.HTTP_200_OK

        )

class ConversationDetailView( RetrieveUpdateDestroyAPIView ):

    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        return Conversation.objects.filter(
            user=self.request.user
        )