"""
Django-Einstellungen für das Projekt „config".

Erzeugt mit „django-admin startproject" unter Django 6.1.

Weitere Informationen zu dieser Datei findest du unter
https://docs.djangoproject.com/en/6.1/topics/settings/

Die vollständige Liste aller Einstellungen und ihrer Werte findest du unter
https://docs.djangoproject.com/en/6.1/ref/settings/
"""

from pathlib import Path
import os
from dotenv import load_dotenv
import dj_database_url

# Baue Pfade innerhalb des Projekts so auf: BASE_DIR / 'Unterverzeichnis'.
BASE_DIR = Path(__file__).resolve().parent.parent
# Erzwingt das Laden der .env-Datei im Projektverzeichnis neben manage.py
load_dotenv(BASE_DIR / '.env')

# Schnellstart-Entwicklungseinstellungen – für die Produktion ungeeignet
# Siehe https://docs.djangoproject.com/en/6.1/howto/deployment/checklist/

# SICHERHEITSWARNUNG: Bewahre den Secret Key in der Produktion unbedingt geheim auf!
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")

# SICHERHEITSWARNUNG: In der Produktion niemals mit aktiviertem Debug-Modus ausführen!
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

ALLOWED_HOSTS = os.getenv(
    "ALLOWED_HOSTS",
    "localhost,127.0.0.1"
).split(",")

# Liest die CORS-Origins aus der .env-Datei
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]

# Aktiviert die Weitergabe von Anmeldedaten über die .env-Datei
CORS_ALLOW_CREDENTIALS = os.getenv("CORS_ALLOW_CREDENTIALS", "False").lower() == "true"

# Definition der Anwendungen

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party apps
    'rest_framework',  # <-- Assurez-vous que cette ligne est présente !
    'corsheaders',
    'apps.buchhaltung',  # Add your app here
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer', # Optionnel pour le dev
    ]
}
WSGI_APPLICATION = 'config.wsgi.application'


# Database
# Configuration de la base de données
DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    raise ValueError("The variable DATABASE_URL cannot be found in the file .env")

DATABASES = {
    'default': dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,
        ssl_require=True
    )
}


# Password validation
# https://docs.djangoproject.com/en/6.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.1/howto/static-files/

STATIC_URL = 'static/'


# Email
# https://docs.djangoproject.com/en/6.1/topics/email/#topic-email-configuration

MAILERS = {
    'default': {
        'BACKEND': 'django.core.mail.backends.console.EmailBackend',
    },
}
