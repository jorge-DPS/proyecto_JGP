# -*- coding: utf-8 -*-

from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import redirect

from apps.accounts.api.v1.serializers.login import LoginSerializer
from apps.accounts.selectors.user_selector import UserSelector
from apps.accounts.services.session import SessionService

from apps.accounts.api.v1.serializers.session import (
    GoogleTokenSerializer,
    SessionSerializer,
    AccessTokenSerializer,
)


class GoogleLoginView(APIView):
    """Process a google token_id login."""

    def post(self, request):
        """Get session from google token id.

        POST /api/v1/auth/google-login/
        """
        serializer = GoogleTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = SessionService.process_google_token(
            serializer.validated_data['token'],
        )

        return Response(SessionSerializer(user).data)


class FacebookLoginView(APIView):
    def post(self, request):
        """Get session from facebook access token.

        POST /api/v1/auth/facebook-login/
        """
        serializer = AccessTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = SessionService.process_facebook_token(
            serializer.validated_data['access_token']
        )

        return Response(SessionSerializer(user).data)


class LoginView(APIView):
    #renderer_classes = [TemplateHTMLRenderer]
    #template_name = "simicrofin/panel.html"
    """Process a google token_id login."""

    def post(self, request):
        """Get session token id.
        POST /api/v1/auth/login/
        """
        serializer = LoginSerializer(
            data=request.data,
            context={'request': request},
        )
        serializer.is_valid(raise_exception=True)
        username_or_email = serializer.validated_data.get('user')
        plain_password = serializer.validated_data.get('password')

        user = UserSelector.get_by_username_or_email(username_or_email)
        session = SessionService.validate_session(user, plain_password)
        return Response(SessionSerializer(user).data)
