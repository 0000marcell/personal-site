import React from 'react'
import Text from './Text';
import ArticlesList from './ArticlesList'
import VideosList from './VideosList'
import BooksList from './BooksList'
import Separator from '../components/Separator';

const MeOnTheInternet = () => {
  return (
    <div>
      <Text
        as="h2"
        fontSize={3}
        variant="secondary"
        mb={2}
        css={{ textTransform: 'uppercase', letterSpacing: 4 }}
      >
        Me On the Internet
      </Text>
      <Text fontSize={1} mb={4} variant="secondary">
        The following content is automatically updated everyday
      </Text>
      <ArticlesList />
      <Separator width={[1 / 2, null, 1 / 4]} height={24} my={[3, null, 4]} />
      <VideosList />
      <BooksList />
    </div>
  );
} 

export default MeOnTheInternet 
