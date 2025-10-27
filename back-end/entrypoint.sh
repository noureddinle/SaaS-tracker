#!/bin/sh

echo "Running migrations..."
python manage.py migrate --noinput

echo "Creating superuser if not exists..."
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email="interlud12xe@gmail.com").exists():
    User.objects.create_superuser("interlud12@gmail.com", "Qwerty123456789@")
    print("Superuser created ✅")
else:
    print("Superuser already exists ✅")
END

echo "Starting server..."
python manage.py runserver 0.0.0.0:8000
