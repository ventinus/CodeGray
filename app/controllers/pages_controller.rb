class PagesController < ApplicationController

  def index
    @projects = Project.all.published
    @featured_projects = @projects.featured[0...5]
    @inquiry = Inquiry.new
  end

end
