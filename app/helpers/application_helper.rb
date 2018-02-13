module ApplicationHelper
  def front_end_body_class
    qualified_controller_name = controller.controller_path.gsub('/','-')
    action = controller.action_name == 'preview' ? (qualified_controller_name == 'pages' ? 'index' : 'show') : controller.action_name
    "#{qualified_controller_name}_#{action}"
  end
end
