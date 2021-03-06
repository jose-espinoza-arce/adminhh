# -*- coding: utf-8 -*-
import json
import re

from django.contrib.auth import authenticate, login, logout

from rest_framework import permissions, viewsets, views, status
from rest_framework.response import Response

from rest_framework_jwt.views import ObtainJSONWebToken
#from rest_framework_jwt.utils import jwt_response_payload_handler

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'username': user.username
    }


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)

class LoginJWTView(ObtainJSONWebToken):
    def post(self, request):
        print request.DATA['email']
        #user = Account.objects.get(email=request.DATA.email)
        print Account.objects.filter(email=request.DATA['email'])
        if Account.objects.filter(email=request.DATA['email']).exists():
            serializer = self.serializer_class(data=request.DATA)
            #print serializer

            if serializer.is_valid():
                user = serializer.object.get('user') or request.user
                #print user
                login(request, user)
                token = serializer.object.get('token')
                #print token
                response_data = jwt_response_payload_handler(token, user, request)
                #print response_data

                return Response(response_data)

            print serializer.errors
            return Response({
                'status': 'Clave invalida',
                'message': 'Introduzca la clave correcta.'
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status': 'Usuario no registrado',
                'message': 'Elige un nombre de usuario valido.'
            }, status=status.HTTP_404_NOT_FOUND)


class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        print data
        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Sin autorizacion',
                    'message': 'Esta cuenta fue deshabilitada'
                }, status=status.HTTP_401_UNATHORIZED)
        else:
            return Response({
                'status': 'Sin autorizacion',
                'message': 'Combinacion de usuario/clave invalida.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        """

        :param request:
        :return: data serializer
        """
        print request.data
        errors = []
        if Account.objects.filter(email=request.data['email']).exists():
            errors.append({
                'type': 'email',
                'message': 'Ya existe este correo electrónico'
            })
        if Account.objects.filter(username=request.data['username']).exists():
            errors.append({
                'type': 'username',
                'message': 'Ya existe este nombre de usuario di'
            })

        if not re.match(r'[A-Za-z0-9]{8,}', request.data['password']):
            errors.append({
                'type': 'contraseña',
                'message': 'Contraseña no válida, debe conmtener almenos 8 caractéres con números y letras mayúsculas y minúsculas'
            })

        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data,
                            status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad Request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        print request.data
        print instance.__dict__
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        print serializer.data
        token_serializer = LoginJWTView.serializer_class(data=serializer.data)
        print token_serializer
        if token_serializer.is_valid():
            user = serializer.object.get('user') or request.user
            #print user
            #login(request, user)
            token = serializer.object.get('token')
            #print token
            response_token_data = jwt_response_payload_handler(token, user, request)
            print response_token_data

        return Response(serializer.data)

# Create your views here.
