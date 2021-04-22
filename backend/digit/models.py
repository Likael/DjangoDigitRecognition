from django.db import models
from django.conf import settings
from PIL import Image
from keras.preprocessing import image
from keras.models import load_model
import tensorflow as tf
import cv2
import numpy as np
import os


# Create your models here.

class Digit(models.Model):
    image = models.ImageField(upload_to='images')
    result = models.CharField(max_length=2, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        print(self.image)
        img = Image.open(self.image)
        img = image.img_to_array(img)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = cv2.resize(img, (28, 28), interpolation=cv2.INTER_AREA)
        print(img.shape)
        img = np.expand_dims(img, axis=2)
        img = np.expand_dims(img, axis=0)
        model_name = 'digit_recognition_model.h5'
        try:
            path = os.path.join(settings.BASE_DIR, model_name)
            model = load_model(path)
            pred = model.predict(img)
            self.result = f'Number is recognized as {np.argmax(pred)}'
        except Exception as e:
            print(e.__traceback__)
            self.result = 'Failed to classify'

        return super().save(*args, **kwargs)


def categorize_back(arr):
    for a, x in enumerate(np.nditer(arr)):
        if x == 1.:
            return a
