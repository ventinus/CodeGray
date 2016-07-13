module Publishable
  extend ActiveSupport::Concern
  extend ActiveSupport::Callbacks

  def publish
    self.published = true
    self.save
  end

  def unpublish
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
