from gensim.models import KeyedVectors
import numpy as np
import random

class WordVec:
    __shared_state = {}

    def __init__(self):
        self.__dict__ = self.__shared_state
        try:
            if self.__wordVec_loaded is False:
                self.__model = KeyedVectors.load_word2vec_format("word2vec-50d.txt")
                self.__wordVec_loaded = True
        except AttributeError:
            self.__model = KeyedVectors.load_word2vec_format("word2vec-50d.txt")
            self.__wordVec_loaded = True

    def __cosineSimilarity(v1, v2):
        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

    def __combineWords(self, words):
        return np.sum([self.__model[word] for word in words], axis=0)

    def getWord(self):
        return random.choice(list(self.__model.wv.vocab))

    def wordExists(self, word):
        return word in self.__model

    def tabulateScore(self, target, words):
        return (self.__cosineSimilarity(self.__model[target], self.__combineWords(words)) /
                sum([self.__cosineSimilarity(self.__model[target], self.__model[word]) for word in words]))

