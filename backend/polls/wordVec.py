from gensim.models import KeyedVectors

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
