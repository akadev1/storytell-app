import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories, createStory, updateStory, deleteStory } from '../store/actions/storyActions';
import { fetchChapters, createChapter, updateChapter, deleteChapter } from '../store/actions/chapterActions';
import { fetchScenes, createScene, updateScene, deleteScene } from '../store/actions/sceneActions';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const EditorHeader = styled.h1`
  text-align: center;
`;

const EditorSection = styled.div`
  margin-bottom: 20px;
`;

const EditorButton = styled.button`
  margin-right: 10px;
`;

const Editor = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const chapters = useSelector((state) => state.chapters);
  const scenes = useSelector((state) => state.scenes);

  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);

  useEffect(() => {
    dispatch(fetchStories());
    dispatch(fetchChapters());
    dispatch(fetchScenes());
  }, [dispatch]);

  const handleCreateStory = () => {
    const title = prompt('Enter story title:');
    if (title) {
      dispatch(createStory({ title }));
    }
  };

  const handleUpdateStory = (story) => {
    const title = prompt('Enter new story title:', story.title);
    if (title) {
      dispatch(updateStory({ ...story, title }));
    }
  };

  const handleDeleteStory = (story) => {
    if (window.confirm(`Are you sure you want to delete the story "${story.title}"?`)) {
      dispatch(deleteStory(story.id));
    }
  };

  const handleCreateChapter = () => {
    const title = prompt('Enter chapter title:');
    if (title && selectedStory) {
      dispatch(createChapter({ title, storyId: selectedStory.id }));
    }
  };

  const handleUpdateChapter = (chapter) => {
    const title = prompt('Enter new chapter title:', chapter.title);
    if (title) {
      dispatch(updateChapter({ ...chapter, title }));
    }
  };

  const handleDeleteChapter = (chapter) => {
    if (window.confirm(`Are you sure you want to delete the chapter "${chapter.title}"?`)) {
      dispatch(deleteChapter(chapter.id));
    }
  };

  const handleCreateScene = () => {
    const title = prompt('Enter scene title:');
    const content = prompt('Enter scene content:');
    if (title && content && selectedChapter) {
      dispatch(createScene({ title, content, chapterId: selectedChapter.id }));
    }
  };

  const handleUpdateScene = (scene) => {
    const title = prompt('Enter new scene title:', scene.title);
    const content = prompt('Enter new scene content:', scene.content);
    if (title && content) {
      dispatch(updateScene({ ...scene, title, content }));
    }
  };

  const handleDeleteScene = (scene) => {
    if (window.confirm(`Are you sure you want to delete the scene "${scene.title}"?`)) {
      dispatch(deleteScene(scene.id));
    }
  };

  return (
    <EditorContainer>
      <EditorHeader>Story Editor</EditorHeader>
      <EditorSection>
        <h2>Stories</h2>
        <EditorButton onClick={handleCreateStory}>Create Story</EditorButton>
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              {story.title}
              <EditorButton onClick={() => setSelectedStory(story)}>Select</EditorButton>
              <EditorButton onClick={() => handleUpdateStory(story)}>Update</EditorButton>
              <EditorButton onClick={() => handleDeleteStory(story)}>Delete</EditorButton>
            </li>
          ))}
        </ul>
      </EditorSection>
      {selectedStory && (
        <EditorSection>
          <h2>Chapters</h2>
          <EditorButton onClick={handleCreateChapter}>Create Chapter</EditorButton>
          <ul>
            {chapters
              .filter((chapter) => chapter.storyId === selectedStory.id)
              .map((chapter) => (
                <li key={chapter.id}>
                  {chapter.title}
                  <EditorButton onClick={() => setSelectedChapter(chapter)}>Select</EditorButton>
                  <EditorButton onClick={() => handleUpdateChapter(chapter)}>Update</EditorButton>
                  <EditorButton onClick={() => handleDeleteChapter(chapter)}>Delete</EditorButton>
                </li>
              ))}
          </ul>
        </EditorSection>
      )}
      {selectedChapter && (
        <EditorSection>
          <h2>Scenes</h2>
          <EditorButton onClick={handleCreateScene}>Create Scene</EditorButton>
          <ul>
            {scenes
              .filter((scene) => scene.chapterId === selectedChapter.id)
              .map((scene) => (
                <li key={scene.id}>
                  {scene.title}
                  <EditorButton onClick={() => setSelectedScene(scene)}>Select</EditorButton>
                  <EditorButton onClick={() => handleUpdateScene(scene)}>Update</EditorButton>
                  <EditorButton onClick={() => handleDeleteScene(scene)}>Delete</EditorButton>
                </li>
              ))}
          </ul>
        </EditorSection>
      )}
    </EditorContainer>
  );
};

export default Editor;
