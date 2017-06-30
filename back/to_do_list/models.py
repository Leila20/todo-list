from django.db import models


DAY_TYPE_CHOICES = (
    ('a', 'every day'),
    ('d', 'day'),
    ('m', 'every month'),
)

DAY_OF_WEEK_CHOICES = (
    (1, 'Monday'),
    (2, 'Tuesday'),
    (3, 'Wednesday'),
    (4, 'Thursday'),
    (5, 'Friday'),
    (6, 'Saturday'),
    (7, 'Sunday'),
)


class Room(models.Model):

    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Day(models.Model):

    type = models.CharField(max_length=1, choices=DAY_TYPE_CHOICES)
    day_of_week = models.PositiveIntegerField(choices=DAY_OF_WEEK_CHOICES, blank=True, null=True)

    def __str__(self):
        if self.type == 'd':
            day_names = dict(DAY_OF_WEEK_CHOICES)
            return day_names[self.day_of_week]
        day_names = dict(DAY_TYPE_CHOICES)
        return day_names[self.type]

    def matches(self, date):
        if self.type == 'a':
            return True
        if self.type == 'm' and date.day == 1:
            return True
        if self.type == 'd' and date.isoweekday() == self.day_of_week:
            return True
        return False

class TemplateTask(models.Model):

    description = models.TextField()
    room = models.ForeignKey(Room, related_name='templates')
    day = models.ForeignKey(Day, related_name='templates')
    updatable = models.BooleanField()

    def __str__(self):
        return self.description

class TaskInstance(models.Model):

    task = models.ForeignKey(TemplateTask, related_name='instance')
    done = models.BooleanField()
    date = models.DateField()

    def __str__(self):
        return self.task.description
