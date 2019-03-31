from django.http import HttpResponse, HttpResponseRedirect # noqa: 401
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import *
import WordVec

def game_create(request):
    try:
        game = Game()
        game.target = WordVec.getWord()
        game.invite = WordVec.getWord() + " " + WordVec.getWord() + " " + WordVec.getWord()
        team = Team(game=game)
        player = Player(team=team)
        player.name = player.pk
    except:

    game.save()
    team.save()
    player.save()


def game_get(request, pk):

def game_join(request, invite):

def game_create_team(request, pk):

def game_change_target(request, pk, word):

def team(request, pk):

def player(request, pk):

def player_switch_team(request, pk, team_pk):

def player_change_name(request, pk, name):

def player_update_word(request, pk, word):

# path('')


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(
            reverse('polls:results', args=(question.id,))
        )
