module PublishableActions
  extend ActiveSupport::Concern

  def klass
    controller_name.classify.constantize
  end

  def publish_redirect_url
    eval("admin_#{controller_name}_url")
  end

  def publish
    @record = klass.find(params[:id])
    if @record.valid_to_publish && @record.publish
      flash[:success] = "#{klass} was successfully published."
      redirect_to publish_redirect_url
    else
      redirect_to publish_redirect_url
      flash[:error] = "Error: #{klass} could not be published."
    end
  end

  def unpublish
    @record = klass.find(params[:id])
    if @record.valid_to_unpublish && @record.unpublish
      flash[:success] = "#{klass} was successfully unpublished."
      redirect_to publish_redirect_url
    else
      redirect_to publish_redirect_url
      flash[:error] = "Error: #{klass} could not be unpublished."
    end
  end
end
