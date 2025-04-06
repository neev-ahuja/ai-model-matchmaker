
import React, { useState, useEffect } from 'react';

const ApiKeyForm = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    provider: '',
    apiKey: '',
    nickname: '',
    modelType: '',
    isDefault: false
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showKey, setShowKey] = useState({});

  const aiProviders = [
    { id: 'openai', name: 'OpenAI' },
    { id: 'anthropic', name: 'Anthropic/Claude' },
    { id: 'google', name: 'Google AI/Gemini' },
    { id: 'mistral', name: 'Mistral AI' },
    { id: 'cohere', name: 'Cohere' },
    { id: 'meta', name: 'Meta AI/Llama' },
    { id: 'stability', name: 'Stability AI' },
    { id: 'azure', name: 'Azure OpenAI' },
    { id: 'other', name: 'Other' }
  ];

  const modelTypes = {
    openai: ['GPT-4o', 'GPT-4', 'GPT-3.5-Turbo', 'DALL-E', 'Whisper', 'Custom'],
    anthropic: ['Claude 3.5 Sonnet', 'Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku', 'Custom'],
    google: ['Gemini Ultra', 'Gemini Pro', 'Gemini Flash', 'PaLM', 'Custom'],
    mistral: ['Mistral Large', 'Mistral Medium', 'Mistral Small', 'Custom'],
    cohere: ['Command', 'Command Light', 'Custom'],
    meta: ['Llama 3', 'Llama 2', 'Llama 3.1', 'Custom'],
    stability: ['Stable Diffusion', 'Custom'],
    azure: ['Azure GPT-4', 'Azure GPT-3.5', 'Custom'],
    other: ['Custom']
  };

  const toggleKeyVisibility = (id) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleProviderChange = (e) => {
    const provider = e.target.value;
    setFormData({
      ...formData,
      provider,
      modelType: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing key
      const updatedKeys = apiKeys.map(key => 
        key.id === editId ? { ...formData, id: editId } : key
      );
      setApiKeys(updatedKeys);
    } else {
      // Add new key
      const newKey = {
        ...formData,
        id: Date.now(),
        dateAdded: new Date().toLocaleDateString()
      };
      
      // If this is the first key or marked as default, update other keys
      const updatedKeys = formData.isDefault 
        ? apiKeys.map(key => ({ ...key, isDefault: false }))
        : [...apiKeys];
      
      setApiKeys([...updatedKeys, newKey]);
    }
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      provider: '',
      apiKey: '',
      nickname: '',
      modelType: '',
      isDefault: false
    });
    setEditMode(false);
    setEditId(null);
    setShowForm(false);
  };

  const editKey = (key) => {
    setFormData({
      provider: key.provider,
      apiKey: key.apiKey,
      nickname: key.nickname,
      modelType: key.modelType,
      isDefault: key.isDefault
    });
    setEditMode(true);
    setEditId(key.id);
    setShowForm(true);
  };

  const deleteKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const setAsDefault = (id) => {
    const updatedKeys = apiKeys.map(key => ({
      ...key,
      isDefault: key.id === id
    }));
    setApiKeys(updatedKeys);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Model API Keys</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add New API Key'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? 'Edit API Key' : 'Add New AI API Key'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AI Provider
                </label>
                <select
                  name="provider"
                  value={formData.provider}
                  onChange={handleProviderChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select AI Provider</option>
                  {aiProviders.map(provider => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nickname (Optional)
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="e.g., Production OpenAI Key"
                />
              </div>

              {formData.provider && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Type
                  </label>
                  <select
                    name="modelType"
                    value={formData.modelType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option value="">Select Model Type</option>
                    {modelTypes[formData.provider]?.map(model => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter your API key"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <span className="text-sm text-gray-700">Set as default API key</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                {editMode ? 'Update Key' : 'Save Key'}
              </button>
            </div>
          </form>
        </div>
      )}

      {apiKeys.length > 0 ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your API Keys</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nickname</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {apiKeys.map((key) => {
                  const providerName = aiProviders.find(p => p.id === key.provider)?.name || key.provider;
                  
                  return (
                    <tr key={key.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                            {key.provider.charAt(0).toUpperCase()}
                          </div>
                          <span>{providerName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {key.nickname || '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {key.modelType}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-mono">
                            {showKey[key.id] ? key.apiKey : key.apiKey.substring(0, 4) + '•••••••••••••••'}
                          </span>
                          <button 
                            onClick={() => toggleKeyVisibility(key.id)}
                            className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                          >
                            {showKey[key.id] ? 'Hide' : 'Show'}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {key.dateAdded}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {key.isDefault ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Default
                          </span>
                        ) : (
                          <button
                            onClick={() => setAsDefault(key.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Set Default
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editKey(key)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteKey(key.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !showForm && (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="text-gray-500 mb-3">No API keys added yet</div>
            <button
              onClick={() => setShowForm(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Add your first AI model API key
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default ApiKeyForm;