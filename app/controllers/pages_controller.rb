class PagesController < ApplicationController

  def index
    @projects = Project.all.published
    @inquiry = Inquiry.new
  end

end
