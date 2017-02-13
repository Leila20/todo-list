from django.core.management.base import BaseCommand, CommandError
from ...models import TemplateTask, TaskInstance
from datetime import date

class Command(BaseCommand):

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

        today = date.today()

        TaskInstance.objects.filter(date=today).delete()

        for instance in TaskInstance.objects.filter(done=False, task__updatable=True):
            instance.date = today
            instance.save()

        for template in TemplateTask.objects.all():
            if template.day.matches(today):
                instance = TaskInstance(task=template, done=False, date=today)
                instance.save()

