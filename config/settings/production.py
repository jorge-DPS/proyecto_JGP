# -*- coding: utf-8 -*-

"""Production settings.

This file contains all the settings used in production.
This file is required and if development.py is present these
values are overridden.
https://docs.djangoproject.com/en/2.2/howto/deployment/
"""


from config.settings.components import env
#from config.settings.components.common import TEMPLATES, INSTALLED_APPS, MIDDLEWARE, AUTH_USER_MODEL, STATIC_ROOT, STATIC_URL
from config.settings.components.common import *
from config.settings.components.caches import *
from config.settings.components.celery import *
from config.settings.components.databases import DATABASES

DEBUG = False

ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS')
SECRET_KEY = env('DJANGO_SECRET_KEY')

#
# TEMPLATE CONFIGURATION
# ------------------------------------------------------------------------------
# See:
# https://docs.djangoproject.com/en/dev/ref/templates/api/#django.template.loaders.cached.Loader
TEMPLATES[0]['OPTIONS']['loaders'] = [  # noqa: F405
    (
        'django.template.loaders.cached.Loader',
        [
            'django.template.loaders.filesystem.Loader',
            'django.template.loaders.app_directories.Loader',
        ],
     ),
]

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

_PASS = 'django.contrib.auth.password_validation'  # noqa: S105
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': '{0}.UserAttributeSimilarityValidator'.format(_PASS),
    },
    {
        'NAME': '{0}.MinimumLengthValidator'.format(_PASS),
    },
    {
        'NAME': '{0}.CommonPasswordValidator'.format(_PASS),
    },
    {
        'NAME': '{0}.NumericPasswordValidator'.format(_PASS),
    },
]

# Security
# https://docs.djangoproject.com/en/2.2/topics/security/

# SECURE_HSTS_SECONDS = 31536000  # the same as Caddy has
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True

# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = False

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

#
#  STORAGE CONFIGURATION
# ------------------------------------------------------------------------------

INSTALLED_APPS += ('django_s3_storage', )  # noqa F405

# Boto3 can use an IAM role if the application is running on AWS
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/iam-example-policies.html
# This eliminates the need to use keys
# AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')

# https://github.com/etianen/django-s3-storage
"""
"""
#AWS_S3_BUCKET_NAME = env('AWS_S3_BUCKET_NAME')
#AWS_S3_BUCKET_NAME_STATIC = AWS_S3_BUCKET_NAME

# AWS_CACHE_EXPIRATION = 60 * 60 * 24  # 1 hours.
# AWS_S3_MAX_AGE_SECONDS_CACHED_STATIC = AWS_CACHE_EXPIRATION
# AWS_S3_BUCKET_AUTH = False
# AWS_S3_MAX_AGE_SECONDS = AWS_CACHE_EXPIRATION
# AWS_S3_GZIP = True
# AWS_REGION = env('AWS_S3_REGION_NAME', default=None)
# AWS_LOCATION = ''

# DEFAULT_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'
# STATICFILES_STORAGE = 'django_s3_storage.storage.StaticS3Storage'

# AWS_S3_CUSTOM_DOMAIN = '{0}.s3.amazonaws.com'.format(AWS_S3_BUCKET_NAME)
# STATIC_URL = 'https://{0}/static/'.format(AWS_S3_CUSTOM_DOMAIN)
# MEDIA_URL = 'https://{0}/media/'.format(AWS_S3_CUSTOM_DOMAIN)


#  EMAIL CONFIGURATION
# ------------------------------------------------------------------------------
"""
EMAIL_SUBJECT_PREFIX = env('EMAIL_SUBJECT_PREFIX', default='[Jes??s del Gran Poder] ')
SERVER_EMAIL = env('SERVER_EMAIL', default=DEFAULT_FROM_EMAIL)
INSTALLED_APPS += ["anymail"]
ANYMAIL = {
    "MAILGUN_API_KEY": env('MAILGUN_API_KEY'),
    "MAILGUN_SEND_DEFAULTS": {
        "esp_extra": {"sender_domain": "mg.jgp.com.bo"}
    }
}

DEFAULT_FROM_EMAIL = env(
    'DEFAULT_FROM_EMAIL', 
    default='Guardvant <soporte@jesusgranpoder.com>'
)
EMAIL_BACKEND = "anymail.backends.mailgun.MailgunBackend"  # or sendgrid.SendGridBackend, or...
"""