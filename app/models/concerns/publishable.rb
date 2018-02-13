module Publishable
  extend ActiveSupport::Concern
  extend ActiveSupport::Callbacks

  def publish
    self.published = true
    self.save
  end

  def unpublish
    if self.is_a?(Project) && self.featured_position.present?
      index = self.featured_position
      featured_projects = Project.all.featured
      (index..featured_projects.length).each do |i|
        featured_projects[i - 1].featured_position -= 1
        featured_projects[i - 1].save
      end
      self.featured_position = nil
      self.featured = false
    end
    self.published = false
    self.save
  end

  # Can overwrite to provide publishing validation
  def valid_to_publish
    self.valid?
  end

  def valid_to_unpublish
    self.valid?
  end

  def valid_to_destroy
    !self.is_published?
  end
end
