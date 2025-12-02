'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReportPestSightingProps {
  onClose: () => void;
  onSubmit: (report: PestReport) => void;
}

export interface PestReport {
  pestType: string;
  location: string;
  zipCode: string;
  dateSpotted: string;
  severity: 'light' | 'moderate' | 'severe';
  plantAffected: string;
  description: string;
  photo?: File;
  contactEmail?: string;
}

export function ReportPestSighting({ onClose, onSubmit }: ReportPestSightingProps) {
  const [formData, setFormData] = useState<PestReport>({
    pestType: '',
    location: '',
    zipCode: '',
    dateSpotted: new Date().toISOString().split('T')[0],
    severity: 'moderate',
    plantAffected: '',
    description: '',
    contactEmail: ''
  });
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const commonPests = [
    'Spotted Lanternfly',
    'Japanese Beetle',
    'Aphids',
    'Tomato Hornworm',
    'Cabbage Worm',
    'Squash Bug',
    'Cucumber Beetle',
    'Slugs/Snails',
    'Spider Mites',
    'Whiteflies',
    'Other (describe below)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'Photo must be less than 5MB' }));
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, photo: 'Please upload an image file' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, photo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setErrors(prev => ({ ...prev, photo: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.pestType) {
      newErrors.pestType = 'Please select a pest type';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Please enter a location';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Please enter your ZIP code';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
    }
    
    if (!formData.dateSpotted) {
      newErrors.dateSpotted = 'Please select a date';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a description';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In production, this would upload to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(formData);
      
      // Show success message
      alert('Thank you for reporting! Your sighting helps protect Frederick County.');
      
      // Reset form
      setFormData({
        pestType: '',
        location: '',
        zipCode: '',
        dateSpotted: new Date().toISOString().split('T')[0],
        severity: 'moderate',
        plantAffected: '',
        description: '',
        contactEmail: ''
      });
      setPhotoPreview(null);
      
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background border border-border rounded-lg max-w-2xl w-full my-8 shadow-xl">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Report a Pest Sighting
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Help the community by reporting pest sightings in your area
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Pest Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Pest Type *
            </label>
            <select
              name="pestType"
              value={formData.pestType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="">Select a pest...</option>
              {commonPests.map(pest => (
                <option key={pest} value={pest}>{pest}</option>
              ))}
            </select>
            {errors.pestType && <p className="text-red-500 text-sm mt-1">{errors.pestType}</p>}
          </div>

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Location (City/Neighborhood) *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown Frederick"
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="21701"
                maxLength={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          {/* Date and Severity */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Date Spotted *
              </label>
              <input
                type="date"
                name="dateSpotted"
                value={formData.dateSpotted}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
              {errors.dateSpotted && <p className="text-red-500 text-sm mt-1">{errors.dateSpotted}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Infestation Severity
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              >
                <option value="light">Light (Just a few)</option>
                <option value="moderate">Moderate (Noticeable presence)</option>
                <option value="severe">Severe (Heavy infestation)</option>
              </select>
            </div>
          </div>

          {/* Plant Affected */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Plant Affected (optional)
            </label>
            <input
              type="text"
              name="plantAffected"
              value={formData.plantAffected}
              onChange={handleInputChange}
              placeholder="e.g., Tomato, Rose, Maple tree"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Please describe what you saw, including size, color, behavior, and any damage to plants..."
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
            />
            <p className="text-sm text-muted-foreground mt-1">
              {formData.description.length} characters (minimum 20)
            </p>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Photo (optional but helpful)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {photoPreview && (
              <div className="mt-3">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="max-w-xs rounded-lg border-2 border-border"
                />
              </div>
            )}
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
            <p className="text-sm text-muted-foreground mt-1">
              Max file size: 5MB
            </p>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Contact Email (optional)
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
            {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            <p className="text-sm text-muted-foreground mt-1">
              We'll only use this to follow up if needed
            </p>
          </div>

          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}




