from django.http import JsonResponse, HttpResponse, HttpResponseRedirect # noqa: 401
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.forms.models import model_to_dict

from .models import *
from .wordVec import WordVec

ErrorResponse = JsonResponse({'status': 400, 'message': 'Something went wrong.'})
SuccessResponse = JsonResponse({'status': 200, 'message': 'Success.'})
wv = WordVec()

def game_create(request):
    try:
        game = Game()
        game.target = wv.getWord()
        game.invite = wv.getWord() + "-" + wv.getWord() + "-" + wv.getWord()
        game.save()

        team = Team(game=game)
        team.save()

        player = Player(team=team)
        player.name = wv.getWord()
        player.master = True
        player.save()
    except:
        raise
    else:
        return SuccessResponse

def game_join(request, invite):
    try:
        print(invite)
        game = Game.objects.get(invite=invite)
        team = get_object_or_404(Team, game=game)
        player = Player(team=team)
        player.name = wv.getWord()
        player.save()
    except:
        raise
    else:
        return SuccessResponse

def game_get(request, pk):
    responseDict = get_object_or_404(Game.objects.all().values('id', 'target', 'invite', 'created_datetime'), pk=pk)
    responseDict['status'] = 200
    responseDict['message'] = "success"
    responseDict['teams'] = list(Team.objects.filter(game=pk).values('id'))
    return JsonResponse(responseDict)

def game_create_team(request, pk):
    pass

def game_change_target(request, pk, word):
    pass

def team(request, pk):
    responseDict = {'id': pk, 'status': 200, 'message': 'success'}
    responseDict['players'] = list(Player.objects.filter(team=pk).values('id'))
    return JsonResponse(responseDict)

def player(request, pk):
    responseDict = get_object_or_404(Player.objects.all().values('id', 'name', 'word', 'word_add', 'team', 'master'), pk=pk)
    responseDict['status'] = 200
    responseDict['message'] = "success"
    return JsonResponse(responseDict)

def player_switch_team(request, pk, team_pk):
    pass

def player_change_name(request, pk, name):
    pass

def player_update_word(request, pk, word):
    pass


# class IndexView(generic.ListView):
#     template_name = 'polls/index.html'
#     context_object_name = 'latest_question_list'

#     def get_queryset(self):
#         """Return the last five published questions."""
#         return Question.objects.order_by('-pub_date')[:5]


# # class DetailView(generic.DetailView):
# #     model = Question
# #     template_name = 'polls/detail.html'


# # class ResultsView(generic.DetailView):
# #     model = Question
# #     template_name = 'polls/results.html'


# # def vote(request, question_id):
# #     question = get_object_or_404(Question, pk=question_id)
# #     try:
# #         selected_choice = question.choice_set.get(pk=request.POST['choice'])
# #     except (KeyError, Choice.DoesNotExist):
# #         # Redisplay the question voting form.
# #         return render(request, 'polls/detail.html', {
# #             'question': question,
# #             'error_message': "You didn't select a choice.",
# #         })
# #     else:
# #         selected_choice.votes += 1
# #         selected_choice.save()
# #         # Always return an HttpResponseRedirect after successfully dealing
# #         # with POST data. This prevents data from being posted twice if a
# #         # user hits the Back button.
# #         return HttpResponseRedirect(
# #             reverse('polls:results', args=(question.id,))
# #         )
