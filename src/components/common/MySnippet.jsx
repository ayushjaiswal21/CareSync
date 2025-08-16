import React, { useState } from 'react';

const MySnippet = () => {
  const [snippets, setSnippets] = useState([
    // Dummy data for initial view
    { id: 1, title: 'Sample Snippet 1', code: 'console.log("Hello, World!");', language: 'JavaScript', tags: ['sample', 'hello'] },
    { id: 2, title: 'Sample Snippet 2', code: '<h1>Hello, React!</h1>', language: 'JSX', tags: ['sample', 'react'] }
  ]);
  const [newSnippet, setNewSnippet] = useState({ title: '', code: '', language: '', tags: '' });
  const [editingSnippet, setEditingSnippet] = useState(null); // holds the snippet being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentSnippet = editingSnippet || newSnippet;
    const updatedSnippet = { ...currentSnippet, [name]: value };

    if (editingSnippet) {
      setEditingSnippet(updatedSnippet);
    } else {
      setNewSnippet(updatedSnippet);
    }
  };

  const handleAddSnippet = (e) => {
    e.preventDefault();
    const snippetToAdd = { ...newSnippet, id: Date.now(), tags: newSnippet.tags.split(',').map(tag => tag.trim()).filter(tag => tag) };
    setSnippets([...snippets, snippetToAdd]);
    setNewSnippet({ title: '', code: '', language: '', tags: '' }); // Reset form
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };

  const handleEditSnippet = (snippet) => {
    setEditingSnippet({...snippet, tags: snippet.tags.join(', ')});
  };

  const handleUpdateSnippet = (e) => {
    e.preventDefault();
    const updated = {...editingSnippet, tags: editingSnippet.tags.split(',').map(tag => tag.trim()).filter(tag => tag)};
    setSnippets(snippets.map(snippet => (snippet.id === updated.id ? updated : snippet)));
    setEditingSnippet(null); // Exit editing mode
  };

  const handleCancelEdit = () => {
    setEditingSnippet(null);
  };

  const formTitle = editingSnippet ? 'Edit Snippet' : 'Add a New Snippet';
  const currentSnippetData = editingSnippet || newSnippet;
  const handleSubmit = editingSnippet ? handleUpdateSnippet : handleAddSnippet;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Snippets</h1>

      {/* Form for adding/editing snippets */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
        <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-100">{formTitle}</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={currentSnippetData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Code</label>
          <textarea
            name="code"
            id="code"
            rows="5"
            value={currentSnippetData.code}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
          <input
            type="text"
            name="language"
            id="language"
            value={currentSnippetData.language}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={currentSnippetData.tags}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {editingSnippet ? 'Update Snippet' : 'Add Snippet'}
        </button>
        {editingSnippet && (
          <button type="button" onClick={handleCancelEdit} className="ml-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded text-gray-800 dark:text-gray-200">
            Cancel
          </button>
        )}
      </form>

      {/* List of snippets */}
      <div>
        {snippets.map(snippet => (
          <div key={snippet.id} className="p-4 mb-4 border rounded shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{snippet.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{snippet.language}</p>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto text-gray-800 dark:text-gray-200">
              <code>{snippet.code}</code>
            </pre>
            <div className="mt-2">
              {snippet.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">#{tag}</span>
              ))}
            </div>
            <div className="mt-4">
              <button onClick={() => handleEditSnippet(snippet)} className="px-3 py-1 bg-yellow-400 text-white rounded mr-2">Edit</button>
              <button onClick={() => handleDeleteSnippet(snippet.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySnippet;
