from django.db import models

# Create your models here.
class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=120)
    author = models.CharField(max_length=120)
    year = models.IntegerField()
    price= models.FloatField()

    def _str_(self):
        return self.title