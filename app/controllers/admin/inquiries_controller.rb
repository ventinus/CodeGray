class Admin::InquiriesController < Admin::ApplicationController

  def index
    @inquiries = Inquiry.all
  end

  def destroy
    @inquiry = Inquiry.find(params[:id])
    if @inquiry.destroy
      redirect_to admin_inquiries_path, notice: "#{@inquiry.name} was deleted."
    else
      render :index
    end
  end
end
