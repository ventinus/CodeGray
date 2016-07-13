class Admin::ProjectsController < Admin::ApplicationController
  include PublishableActions
  before_action :set_project, only: [:edit, :update, :destroy]

  def index
    @projects = Project.all
  end

  def new
    @companies = Company.all
    @project = Project.new
  end

  def edit
    @companies = Company.all
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      redirect_to admin_projects_path, notice: 'Project successfully created.'
    else
      render :new
    end
  end

  def update
    if @project.update(project_params)
      redirect_to admin_projects_path, notice: "#{@project.name} successfully updated."
    else
      flash[:error] = 'Project was not updated.'
      render :edit
    end
  end

  def destroy
    if @project.destroy
      redirect_to admin_projects_path, notice: "#{@project.name} was deleted."
    else
      render :index
    end
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :url, :description,
                                    :image, :retained_image, :published,
                                    :featured, :featured_position)
  end
end
