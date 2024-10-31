import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStory } from '../store/actions/storyActions';
import { useParams } from 'react-router-dom';

const StoryViewer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const story = useSelector((state) => state.stories.currentStory);
  const loading = useSelector((state) => state.stories.loading);
  const error = useSelector((state) => state.stories.error);

  useEffect(() => {
    dispatch(fetchStory(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!story) {
    return <p>Story not found</p>;
  }

  return (
    <div>
      <h1>{story.title}</h1>
      <p>By {story.author}</p>
      {story.chapters.map((chapter) => (
        <div key={chapter._id}>
          <h2>{chapter.title}</h2>
          {chapter.scenes.map((scene) => (
            <div key={scene._id}>
              <h3>{scene.title}</h3>
              <p>{scene.content}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StoryViewer;
