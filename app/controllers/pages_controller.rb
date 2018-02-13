class PagesController < ApplicationController

  def index
    @projects = Project.all.published
    @featured_projects = @projects.featured
    @inquiry = Inquiry.new
  end

end
