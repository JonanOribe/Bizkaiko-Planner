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

EXPOSE 8006

ENV PYTHONUNBUFFERED=1

CMD ["gunicorn","--workers", "3","--worker-class", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000","--timeout","600"]