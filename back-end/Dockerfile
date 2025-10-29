# 1️⃣ Use a full Python image with build tools
FROM python:3.11-slim

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 4️⃣ Copy only requirements first (for caching)
COPY requirements.txt .

# 5️⃣ Upgrade pip and install dependencies
RUN pip install --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt\
      --extra-index-url https://download.pytorch.org/whl/cpu

# 6️⃣ Copy the full project after dependencies
COPY . .

# 7️⃣ Default command
CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
