import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '../store/actions/storyActions';
import { Link } from 'react-router-dom';

const StoryList = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.items);
  const loading = useSelector((state) => state.stories.loading);
  const error = useSelector((state) => state.stories.error);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story._id}>
            <Link to={`/stories/${story._id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
