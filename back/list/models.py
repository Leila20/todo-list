from django.db import models

class ListItem(models.Model):

    description = models.CharField(max_length=255)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.description


class List(models.Model):

    name = models.CharField(max_length=255)
    description = models.ForeignKey(ListItem, related_name='todo')

    def __str__(self):
        return self.name


