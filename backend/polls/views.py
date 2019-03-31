from django.http import JsonResponse, HttpResponse, HttpResponseRedirect # noqa: 401
from django.shortcuts import get_object_or_404, render, get_list_or_404, redirect
from django.urls import reverse
from django.views import generic
from django.forms.models import model_to_dict

from .models import *
from .wordVec import WordVec

ErrorResponse = JsonResponse({'status': 400, 'message': 'Something went wrong.'})
SuccessResponse = JsonResponse({'status': 200, 'message': 'Success.'})
wv = WordVec()

# returns new player
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
        # return JsonResponse({'status': 200, 'message': 'Success', 'id': game.id})
        return redirect('/player/%s' % str(player.id))

# returns new player
def game_join(request, invite):
    # Joins the first team by default
    try:
        print(invite)
        game = Game.objects.get(invite=invite)
        team = get_list_or_404(Team, game=game)[0]
        player = Player(team=team)
        player.name = wv.getWord()
        player.save()
    except:
        raise
    else:
        # return SuccessResponse
        return redirect('/player/%s' % str(player.id))

# returns game details
def game_get(request, pk):
    responseDict = get_object_or_404(Game.objects.all().values('id', 'target', 'invite', 'created_datetime', 'timeout', 'state'), pk=pk)
    responseDict['finish_datetime'] = responseDict['created_datetime'] + responseDict['timeout']
    responseDict['time_left_secs'] = responseDict['finish_datetime'] - timezone.now()
    responseDict['status'] = 200
    responseDict['message'] = "success"
    responseDict['teams'] = list(Team.objects.filter(game=pk).values('id'))
    if responseDict['state'] == 2:
        words = []
        for t in responseDict['teams']:
            words += [x['word'] for x in list(Player.objects.filter(team=t['id']).values('word'))]
        responseDict['score'] = wv.tabulateScore(responseDict['target'], words)
    return JsonResponse(responseDict)

# returns new team
def game_create_team(request, pk):
    game = get_object_or_404(Game, pk=pk)
    team = Team(game=game)
    team.save()
    # return JsonResponse({'status': 200, 'message': 'Success', 'id': team.id})
    return redirect('/team/%s' % str(team.id))

# returns nothing
def game_change_target(request, pk, word):
    game = get_object_or_404(Game, pk=pk)
    game.target = word
    game.save()
    return SuccessResponse

# returns team details (game, and players in the team)
def team(request, pk):
    responseDict = {'id': pk, 'status': 200, 'message': 'success'}
    team = get_object_or_404(Team, pk=pk)
    responseDict['game'] = team.game.id
    responseDict['players'] = list(Player.objects.filter(team=pk).values('id'))
    return JsonResponse(responseDict)

# returns player details
def player(request, pk):
    responseDict = get_object_or_404(Player.objects.all().values('id', 'name', 'word', 'word_add', 'team', 'master'), pk=pk)
    responseDict['status'] = 200
    responseDict['message'] = "success"
    return JsonResponse(responseDict)

# returns nothing
def player_switch_team(request, pk, team_pk):
    player = get_object_or_404(Player, pk=pk)
    team = get_object_or_404(Team, pk=team_pk)
    player.team = team
    player.save()
    return SuccessResponse

# returns nothing
def player_change_name(request, pk, name):
    player = get_object_or_404(Player, pk=pk)
    player.name = name
    player.save()
    return SuccessResponse

# returns nothing
def player_update_word(request, pk, word, word_add):
    if not wv.wordExists(word):
        return JsonResponse({'status': 400, 'message': 'Word does not exist.'})
    player = get_object_or_404(Player, pk=pk)
    player.word = word
    if word_add == 'add':
        player.word_add = True 
    elif word_add == 'sub':
        player.word_add = False
    else:
        return JsonResponse({'status': 400, 'message': 'Malformed word_add field.'})
    player.save()
    return SuccessResponse

# returns a nice HTML description of the API
def index_view(request):
    return render(request, 'polls/index.html')
