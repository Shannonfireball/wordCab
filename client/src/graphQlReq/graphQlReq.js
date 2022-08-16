import {ApolloClient,InMemoryCache,gql} from '@apollo/client'
export const client = new ApolloClient({
    uri:'http://localhost:9000/graphql',
    cache:new InMemoryCache()
});

export const GET_WORDS = async ()=>{
    const result = await client.query({
        query:gql`{
            Words{
                word
                entries{
                    origin
                    partOfSpeech
                    definitions
                    examples
                }
            }
        }
        `
    })
    return result.data.Words;
}

export const ADD_WORD = async (word)=>{
    const result = await client.mutate({
        mutation:gql`
        mutation{
            addWord(word:"${word}"){
                word
                entries{
                    origin
                    partOfSpeech
                    definitions
                    examples
                }
            }
        }
        `
    })
    // .then(data => console.log(data.data.addWord)) ;
    return result.data.addWord
}

export const GET_WORDS_NEW = gql`

  query getWordsNew {
    Words {
        word
        entries{
            origin
            partOfSpeech
            definitions
            examples
        }
  }}
`;