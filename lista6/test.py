from graphviz import Digraph

# Tworzenie diagramu aktywności
diagram = Digraph("Diagram_aktywnosci", format="png")
diagram.attr(rankdir="TB", size="8,10")
diagram.attr('node', shape='ellipse', fontsize='10')

# Start
diagram.node("start", label="Start", shape="circle")

# Główne akcje
diagram.node("choose_action", label="Pracownik wybiera akcję")

# Dodanie produktu
diagram.node("add_product", label="Dodanie produktu")
diagram.node("enter_product_data", label="Wprowadzenie danych produktu")
diagram.node("validate_data", label="Walidacja danych")
diagram.node("save_to_db", label="Zapisanie produktu w bazie")
diagram.node("notify_success_add", label="Powiadomienie o sukcesie")

# Usunięcie produktu
diagram.node("delete_product", label="Usunięcie produktu")
diagram.node("confirm_delete", label="Potwierdzenie usunięcia")
diagram.node("delete_from_db", label="Usunięcie z bazy danych")
diagram.node("notify_success_delete", label="Powiadomienie o sukcesie")

# Edycja produktu
diagram.node("edit_product", label="Edycja produktu")
diagram.node("show_details", label="Wyświetlenie szczegółów produktu")
diagram.node("enter_changes", label="Wprowadzenie zmian")
diagram.node("validate_changes", label="Walidacja zmian")
diagram.node("save_changes", label="Zapisanie zmian w bazie")
diagram.node("notify_success_edit", label="Powiadomienie o sukcesie")

# Decyzje i rozgałęzienia
diagram.node("decision", label="Czy dane są poprawne?", shape="diamond")

# Połączenia dla dodania produktu
diagram.edge("start", "choose_action")
diagram.edge("choose_action", "add_product", label="Dodanie produktu")
diagram.edge("add_product", "enter_product_data")
diagram.edge("enter_product_data", "validate_data")
diagram.edge("validate_data", "decision")
diagram.edge("decision", "save_to_db", label="TAK")
diagram.edge("decision", "enter_product_data", label="NIE")
diagram.edge("save_to_db", "notify_success_add")
diagram.edge("notify_success_add", "choose_action")

# Połączenia dla usunięcia produktu
diagram.edge("choose_action", "delete_product", label="Usunięcie produktu")
diagram.edge("delete_product", "confirm_delete")
diagram.edge("confirm_delete", "delete_from_db")
diagram.edge("delete_from_db", "notify_success_delete")
diagram.edge("notify_success_delete", "choose_action")

# Połączenia dla edycji produktu
diagram.edge("choose_action", "edit_product", label="Edycja produktu")
diagram.edge("edit_product", "show_details")
diagram.edge("show_details", "enter_changes")
diagram.edge("enter_changes", "validate_changes")
diagram.edge("validate_changes", "decision")
diagram.edge("decision", "save_changes", label="TAK", constraint="false")
diagram.edge("save_changes", "notify_success_edit")
diagram.edge("notify_success_edit", "choose_action")

# Stop
diagram.node("stop", label="Stop", shape="circle")
diagram.edge("choose_action", "stop", label="Zakończ proces")

# Zapis diagramu
diagram_filepath = "/Users/mikolajolesinski/Desktop/diagram_aktywnosci"
diagram.render(diagram_filepath, cleanup=True)
diagram_filepath
