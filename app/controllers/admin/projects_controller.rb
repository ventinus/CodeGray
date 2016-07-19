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

    if @project.featured
      @project.featured_position = Project.all.featured[-1].featured_position + 1
    end

    if @project.save
      redirect_to admin_projects_path, notice: 'Project successfully created.'
    else
      flash[:error] = 'Project was not created.'
      @companies = Company.all
      render :new
    end
  end

  def update
    my_params = project_params

    # checking to see if the user is setting the featured prop
    # if so, automatically update published to true and then
    # check if there is not a featured_position prop set on that
    # project. if not, plop it at the end
    # if setting featured to false, check if featured_position
    # is currently set and update all the Projects after it with a
    # decremented position
    if my_params["featured"].present?
      if my_params["featured"] == "true"
        my_params["published"] = true
        if !@project.featured_position.present?
          my_params["featured_position"] = Project.all.featured[-1].featured_position + 1
        end
      else
        if @project.featured_position.present?
          index = @project.featured_position
          featured_projects = Project.all.featured
          (index..featured_projects.length).each do |i|
            featured_projects[i - 1].featured_position -= 1
            featured_projects[i - 1].save
          end
          my_params["featured_position"] = nil
        end
      end
    end

    if @project.update(my_params)
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
                                    :featured, :featured_position, :company_id)
  end
end
