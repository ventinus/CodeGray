class Admin::AgenciesController < Admin::ApplicationController
  before_action :set_agency, only: [:edit, :update]

  def index
    @agencies = Agency.all
  end

  def edit
  end

  def new
    @agency = Agency.new
  end

  def create
    @agency = Agency.new(agency_params)

    if @agency.save
      redirect_to admin_agencies_path, notice: 'Agency successfully created.'
    else
      flash[:error] = 'Agency was not created.'
      render :new
    end
  end

  def update
    if @agency.update(agency_params)
      redirect_to admin_agencies_path, notice: "#{@agency.name} successfully updated."
    else
      flash[:error] = 'Agency was not updated.'
      render :edit
    end
  end

  def destroy
    if @agency.destroy
      redirect_to admin_agencies_path, notice: "#{@agency.name} was removed."
    else
      flash[:error] = "agency was not deleted. #{@agency.errors.full_messages.to_sentence}."
      redirect_to admin_agencies_path
    end
  end

  private

  def set_agency
    @agency = Agency.find(params[:id])
  end

  def agency_params
    params.require(:agency).permit(:name, :description)
  end
end
