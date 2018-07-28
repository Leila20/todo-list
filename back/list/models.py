from django.db import models


class List(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ListItem(models.Model):

    lst = models.ForeignKey(List, related_name='items')
    description = models.CharField(max_length=255)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.description

