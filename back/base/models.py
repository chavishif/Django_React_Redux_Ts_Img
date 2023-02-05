from django.db import models

# Create your models here.


class Img(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
   
    def __str__(self):
        return self.title

