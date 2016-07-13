class Admin::CompaniesController < Admin::ApplicationController
  before_action :set_company, only: [:edit, :update]

  def index
    @companies = Company.all
  end

  def edit
  end

  def new
    @company = Company.new
  end

  def update
    if @company.update(company_params)
      redirect_to companies_path, notice: "#{@company.name} successfully updated."
    else
      flash[:error] = 'Company was not updated.'
      render :edit
    end
  end

  def destroy
    if @company.destroy
      redirect_to companies_path, notice: "#{@company.name} was removed."
    else
      flash[:error] = "company was not deleted. #{@company.errors.full_messages.to_sentence}."
      redirect_to companies_path
    end
  end

  private

  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name, :description)
  end
end
