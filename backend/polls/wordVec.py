from gensim.models import KeyedVectors
import random

class WordVec:
    __shared_state = {}

    def __init__(self):
        self.__dict__ = self.__shared_state
        try:
            if self.__wordVec_loaded is False:
                self.model = KeyedVectors.load_word2vec_format("word2vec-50d.txt")
                self.__wordVec_loaded = True
        except AttributeError:
            self.model = KeyedVectors.load_word2vec_format("word2vec-50d.txt")
            self.__wordVec_loaded = True

    def getWord(self):
        return random.choice(list(self.model.wv.vocab))

