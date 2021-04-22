from rest_framework import serializers
from django.core.files.base import ContentFile
from ..models import Digit
import base64
import uuid


class Base64Field(serializers.ImageField):

    def to_internal_value(self, data):
        _format, str_img = data.split(';base64')
        decoded_image = base64.b64decode(str_img)
        fname = f'{str(uuid.uuid4())[:8]}.png'
        data = ContentFile(decoded_image, fname)
        return super().to_internal_value(data)


class DigitSerializer(serializers.ModelSerializer):
    image = Base64Field()

    class Meta:
        model = Digit
        fields = ('id', 'image', 'result')
