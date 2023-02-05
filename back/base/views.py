from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from .models import Img
from django.conf import settings
import os



class ImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Img
        fields = '__all__'



# Create your views here.
@api_view(['GET','POST','DELETE','PUT'])
def img(req, id = -1):
    if req.method =='GET':
        if int(id) > -1:
            try:
                temp_img = Img.objects.get(id=id)
                return Response (ImgSerializer(temp_img,many=False).data)
            except Img.DoesNotExist:
                return Response ("not found")
        all_images = ImgSerializer(Img.objects.all(),many=True).data
        return Response ( all_images)
    if req.method =='POST':
        # print(req.data)
        img_serializer = ImgSerializer(data = req.data) 
        if img_serializer.is_valid():
            img_serializer.save()
            # print(img_serializer)
            return Response (req.method)   
        else:
            return Response (img_serializer.errors)
    if req.method =='DELETE':
        # לסיים דיליט - להצליח למחוק גם את מה שאין לו נתיב
        try:
            temp_img = Img.objects.get(id = id)
        except Img.DoesNotExist:
            return Response(temp_img.image)

        try:
            path = os.path.join(settings.MEDIA_ROOT, temp_img.image.path)
            delete_image(path) 
        except FileNotFoundError:
                print("Image file not found")
        temp_img.delete()
        return Response("Image deleted")

    if req.method =='PUT':
        print("temp_img")
        try:
            temp_img = Img.objects.get(id = id)
           
        except Img.DoesNotExist:
            return Response ("not found")
       
        img_serializer = ImgSerializer(data = req.data)
        old_img = Img.objects.get(id=id)
        path = os.path.join(settings.MEDIA_ROOT, old_img.image.path)
        delete_image(path)
        res = img_serializer.update(old_img, req.data)
        return Response(req.method)


def delete_image(path):
    if path:
        try:
            os.remove(path)
        except OSError:
            print("Error deleting the file")
    else:
        print("This object does not have a file path, no need to delete.")