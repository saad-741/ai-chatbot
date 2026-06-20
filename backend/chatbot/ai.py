from google import genai
from django.conf import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def generate_response(prompt):

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text

def build_conversation_context(conversation):

    messages = conversation.messages.all().order_by("-created_at"
    )[:20]

    messages = reversed(messages)
    context = ""

    for msg in messages:
        if msg.role == "user":
            context += ( f"User: {msg.content}\n")

        else:
            context += (
                f"Assistant: {msg.content}\n"
            )

    return context

def generate_conversation_title(
    first_message
):

    prompt = f"""
        Generate a short chat title
        using 2-5 words.

        Message:
        {first_message}

        Return only title.
        """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text.strip()