from rest_framework import serializers
from .models import Conversation
from .models import Message

class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation

        fields = [
            "id",
            "title",
            "created_at",
        ]

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message

        fields = [
            "id",
            "role",
            "content",
            "created_at",
        ]

        