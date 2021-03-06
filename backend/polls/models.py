import datetime

from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import User


class Word(models.Model):
    word = models.CharField(max_length=200)
    freq = models.FloatField()
    length = models.IntegerField()

    def __str__(self):
        return ("%s : %s" % (self.word, str(self.freq)))

class Game(models.Model):
    # target = models.ForeignKey(Word, on_delete=models.PROTECT)
    target = models.CharField(max_length=200)
    invite = models.CharField(max_length=200) # three 4-letter words?
    created_datetime = models.DateTimeField(default=timezone.now)
    timeout = models.DurationField(default=datetime.timedelta(minutes=2))
    state = models.IntegerField(default=0)

    def seconds_remaining(self):
        return self.created_date + self.timeout - timezone.now()

class Team(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

class Player(models.Model):
    name = models.CharField(max_length=200)
    # word = models.ForeignKey(Word, on_delete=models.PROTECT)
    word = models.CharField(max_length=200)
    word_add = models.BooleanField(default=True) # add or sub
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    master = models.BooleanField(default=False) # is game master

# class Question(models.Model):
#     question_text = models.CharField(max_length=200)
#     pub_date = models.DateTimeField('date published')

#     def __str__(self):
#         return self.question_text

#     def was_published_recently(self):
#         return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


# class Choice(models.Model):
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     choice_text = models.CharField(max_length=200)
#     votes = models.IntegerField(default=0)

#     def __str__(self):
#         return self.choice_text
