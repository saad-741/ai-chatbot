from django.urls import path
from .views import ConversationListCreateView, MessageListView, ChatView,ConversationDetailView

urlpatterns = [ 
    path(
        "conversations/",
        ConversationListCreateView.as_view()
    ),
    path(
        "conversations/<int:pk>/messages/",
        MessageListView.as_view()
    ),
    path(
        "chat/",
        ChatView.as_view()
    ), 
    path(
        "conversations/<int:pk>/",
        ConversationDetailView.as_view()
    ),
]
