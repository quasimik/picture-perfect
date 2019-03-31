from gensim.models import KeyedVectors
import numpy as np
import random
import os
import pickle
cur_dir = os.path.dirname(os.path.abspath(__file__))

class WordVec:
    __shared_state = {}

    def __init__(self):
        self.__dict__ = self.__shared_state
        try:
            if self.__wordVec_loaded is False:
                print('loading w2v...')
                # self.__model = KeyedVectors.load_word2vec_format(cur_dir + "/word2vec-5k.txt")
                self.__model = KeyedVectors.load_word2vec_format(cur_dir + "/word2vec-50d.txt")
                with open(cur_dir + "/word_list.txt") as f:
                    self.__wordset = set([w.strip() for w in f])
                print('done.')
                self.__wordVec_loaded = True
        except AttributeError:
            print('loading w2v...')
            # self.__model = KeyedVectors.load_word2vec_format(cur_dir + "/word2vec-5k.txt")
            self.__model = KeyedVectors.load_word2vec_format(cur_dir + "/word2vec-50d.txt")
            with open(cur_dir + "/word_list.txt") as f:
                self.__wordset = set([w.strip() for w in f])
            print('done.')
            self.__wordVec_loaded = True

    def __cosineSimilarity(self, v1, v2):
        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

    def __combineWords(self, words):
        return np.sum([self.__model[word] for word in words], axis=0)

    def getWord(self):
        return random.choice(list(self.__wordset))

    def wordExists(self, word):
        return word in self.__wordset

    def tabulateScore(self, target, words):
        return (self.__cosineSimilarity(self.__model[target], self.__combineWords(words)) /
                sum([self.__cosineSimilarity(self.__model[target], self.__model[word]) for word in words]))

