FROM python:3.10.9-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends --no-install-suggests \
  build-essential && apt-get clean \
  && pip install --no-cache-dir --upgrade pip

WORKDIR /app
COPY ./requirements.txt /app
COPY ./config.cfg /app
RUN pip install --no-cache-dir --requirement /app/requirements.txt

COPY . /app

EXPOSE 8000

ENV PYTHONUNBUFFERED=1

CMD ["python3", "main.py","--host", "0.0.0.0", "--port", "8000"]