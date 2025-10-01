import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Heart, 
  Clock, 
  Target, 
  Dumbbell,
  ChevronDown,
  X,
  Eye,
  BookOpen
} from 'lucide-react';
import { exerciseDatabase } from '../data/exercises';
import { exerciseCategories } from '../data/exerciseCategories';
import type { Exercise } from '../App';

interface ExerciseLibraryProps {
  onExerciseSelect?: (exercise: Exercise) => void;
  onClose?: () => void;
}

export function ExerciseLibrary({ onExerciseSelect, onClose }: ExerciseLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = useMemo(() => {
    return exerciseDatabase.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.muscleGroups.some(mg => mg.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
        exerciseCategories.find(cat => cat.id === selectedCategory)?.exercises.includes(exercise.id);
      
      const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
      const matchesEquipment = selectedEquipment === 'all' || exercise.equipment === selectedEquipment;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedEquipment]);

  const difficulties = ['beginner', 'intermediate', 'expert'];
  const equipment = [...new Set(exerciseDatabase.map(ex => ex.equipment))];

  const toggleFavorite = (exerciseId: string) => {
    setFavorites(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedEquipment('all');
  };

  const activeFiltersCount = [selectedCategory, selectedDifficulty, selectedEquipment].filter(f => f !== 'all').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-secondary-light/30 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading text-accent">Exercise Library</h1>
            <p className="text-accent/70 font-body">Discover and learn new exercises</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-accent/70 hover:text-accent transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Search and Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent/50" />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary-light/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span className="font-body">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-secondary-light/30">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-body text-accent/70 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                >
                  <option value="all">All Categories</option>
                  {exerciseCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-body text-accent/70 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                >
                  <option value="all">All Levels</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment Filter */}
              <div>
                <label className="block text-sm font-body text-accent/70 mb-2">Equipment</label>
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-light/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                >
                  <option value="all">All Equipment</option>
                  {equipment.map(eq => (
                    <option key={eq} value={eq}>{eq}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-accent/70 hover:text-accent transition-colors font-body"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-accent/70 font-body">
            {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(exercise => (
            <div
              key={exercise.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 hover:bg-white/90 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg group cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
            >
              {/* Exercise Image */}
              <div className="mb-4">
                <img
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              {/* Exercise Info */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-heading text-accent group-hover:text-primary transition-colors">
                    {exercise.name}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(exercise.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(exercise.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-accent/50 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(exercise.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <p className="text-accent/70 text-sm font-body mb-3 line-clamp-2">
                  {exercise.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {exercise.difficulty}
                  </span>
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                    {exercise.equipment}
                  </span>
                </div>

                {/* Muscle Groups */}
                <div className="flex flex-wrap gap-1">
                  {exercise.muscleGroups.slice(0, 3).map(muscle => (
                    <span key={muscle} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                      {muscle}
                    </span>
                  ))}
                  {exercise.muscleGroups.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                      +{exercise.muscleGroups.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedExercise(exercise);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-body">View</span>
                </button>
                {onExerciseSelect && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExerciseSelect(exercise);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-body">Select</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-accent/30 mx-auto mb-4" />
            <h3 className="text-xl font-heading text-accent mb-2">No exercises found</h3>
            <p className="text-accent/70 font-body mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary text-white font-heading rounded-xl hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm rounded-2xl border border-secondary-light/50 shadow-lg">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-heading text-accent mb-2">{selectedExercise.name}</h2>
                  <p className="text-accent/70 font-body">{selectedExercise.description}</p>
                </div>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="p-2 text-accent/70 hover:text-accent transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Exercise Image */}
              <div className="mb-6">
                <img
                  src={selectedExercise.imageUrl}
                  alt={selectedExercise.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <Target className="h-5 w-5 text-accent mx-auto mb-1" />
                  <div className="text-sm font-body text-accent/70">Difficulty</div>
                  <div className="font-heading text-accent capitalize">{selectedExercise.difficulty}</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-accent mx-auto mb-1" />
                  <div className="text-sm font-body text-accent/70">Equipment</div>
                  <div className="font-heading text-accent text-sm">{selectedExercise.equipment}</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <Clock className="h-5 w-5 text-accent mx-auto mb-1" />
                  <div className="text-sm font-body text-accent/70">Type</div>
                  <div className="font-heading text-accent text-sm">Exercise</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <Heart className="h-5 w-5 text-accent mx-auto mb-1" />
                  <div className="text-sm font-body text-accent/70">Muscles</div>
                  <div className="font-heading text-accent text-sm">{selectedExercise.muscleGroups.length}</div>
                </div>
              </div>

              {/* Muscle Groups */}
              <div className="mb-6">
                <h3 className="text-lg font-heading text-accent mb-3">Target Muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.muscleGroups.map(muscle => (
                    <span key={muscle} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-body">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-lg font-heading text-accent mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {selectedExercise.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-accent/80 font-body">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    toggleFavorite(selectedExercise.id);
                    setSelectedExercise(null);
                  }}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl transition-colors ${
                    favorites.includes(selectedExercise.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-accent/10 text-accent hover:bg-accent/20'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(selectedExercise.id) ? 'fill-current' : ''}`} />
                  <span className="font-heading">
                    {favorites.includes(selectedExercise.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </span>
                </button>
                {onExerciseSelect && (
                  <button
                    onClick={() => {
                      onExerciseSelect(selectedExercise);
                      setSelectedExercise(null);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <Play className="h-5 w-5" />
                    <span className="font-heading">Select Exercise</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
