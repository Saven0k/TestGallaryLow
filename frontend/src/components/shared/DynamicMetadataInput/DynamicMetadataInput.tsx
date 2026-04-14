import { useState } from "react";

interface MetadataField {
    id: string;
    label: string;
    value: string;
}

interface DynamicMetadataInputProps {
    value: string;
    onChange: (jsonString: string) => void;
    onError?: (error: string | null) => void;
}

const availableFields = [
    { id: "width", label: "Ширина", placeholder: "например: 120cm", unit: "cm" },
    { id: "height", label: "Высота", placeholder: "например: 80cm", unit: "cm" },
    { id: "thickness", label: "Толщина", placeholder: "например: 5cm", unit: "cm" },
    { id: "color", label: "Цвет", placeholder: "например: красный, синий", unit: "" },
    { id: "material", label: "Материал", placeholder: "например: холст, масло", unit: "" },
    { id: "technique", label: "Техника", placeholder: "например: импрессионизм", unit: "" },
    { id: "year", label: "Год создания", placeholder: "например: 2024", unit: "" },
    { id: "style", label: "Стиль", placeholder: "например: барокко", unit: "" },
];

export const DynamicMetadataInput: React.FC<DynamicMetadataInputProps> = ({ 
    value, 
    onChange, 
    onError 
}) => {
    const [selectedField, setSelectedField] = useState<string>("");
    const [fieldValue, setFieldValue] = useState<string>("");
    const [customFields, setCustomFields] = useState<MetadataField[]>(() => {
        try {
            const parsed = value ? JSON.parse(value) : {};
            return Object.entries(parsed).map(([key, val]) => ({
                id: key,
                label: getLabelByKey(key),
                value: String(val)
            }));
        } catch {
            return [];
        }
    });

    function getLabelByKey(key: string): string {
        const field = availableFields.find(f => f.id === key);
        return field?.label || key;
    }

    const updateMetadata = (fields: MetadataField[]) => {
        const metadataObject: Record<string, string> = {};
        fields.forEach(field => {
            if (field.value.trim()) {
                metadataObject[field.id] = field.value;
            }
        });
        const jsonString = JSON.stringify(metadataObject);
        onChange(jsonString);
    };

    const handleAddField = () => {
        if (!selectedField) {
            onError?.("Выберите поле");
            return;
        }
        if (!fieldValue.trim()) {
            onError?.("Введите значение");
            return;
        }

        const existingIndex = customFields.findIndex(f => f.id === selectedField);
        if (existingIndex !== -1) {
            const updated = [...customFields];
            updated[existingIndex] = { ...updated[existingIndex], value: fieldValue };
            setCustomFields(updated);
            updateMetadata(updated);
        } else {
            const newField: MetadataField = {
                id: selectedField,
                label: availableFields.find(f => f.id === selectedField)?.label || selectedField,
                value: fieldValue
            };
            const updated = [...customFields, newField];
            setCustomFields(updated);
            updateMetadata(updated);
        }

        setSelectedField("");
        setFieldValue("");
        onError?.(null);
    };

    const handleRemoveField = (id: string) => {
        const updated = customFields.filter(f => f.id !== id);
        setCustomFields(updated);
        updateMetadata(updated);
    };

    const handleUpdateField = (id: string, newValue: string) => {
        const updated = customFields.map(f => 
            f.id === id ? { ...f, value: newValue } : f
        );
        setCustomFields(updated);
        updateMetadata(updated);
    };

    return (
        <div className="dynamic-metadata">
            {customFields.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                    <label className="form__label">Добавленные характеристики:</label>
                    {customFields.map(field => (
                        <div key={field.id} style={{ 
                            display: "flex", 
                            gap: "10px", 
                            marginBottom: "10px",
                            alignItems: "center"
                        }}>
                            <span style={{ 
                                minWidth: "100px", 
                                fontWeight: "500",
                                color: "#4a5568"
                            }}>
                                {field.label}:
                            </span>
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => handleUpdateField(field.id, e.target.value)}
                                className="form__input"
                                style={{ flex: 1 }}
                                placeholder="Введите значение"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField(field.id)}
                                style={{
                                    background: "#fc8181",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div style={{ marginTop: "15px" }}>
                <label className="form__label">Добавить характеристику:</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <select
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                        className="form__input"
                        style={{ flex: 1 }}
                    >
                        <option value="">Выберите характеристику</option>
                        {availableFields.map(field => (
                            <option key={field.id} value={field.id}>
                                {field.label} {field.unit ? `(${field.unit})` : ""}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        className="form__input"
                        style={{ flex: 2 }}
                        placeholder="Значение"
                    />
                    <button
                        type="button"
                        onClick={handleAddField}
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            padding: "12px 20px",
                            cursor: "pointer",
                            fontWeight: "500"
                        }}
                    >
                        Добавить
                    </button>
                </div>
            </div>
            {customFields.length > 0 && (
                <div style={{ 
                    marginTop: "15px", 
                    padding: "10px", 
                    background: "#f8fafc", 
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#718096"
                }}>
                    <strong>JSON preview:</strong> {JSON.stringify(Object.fromEntries(
                        customFields.map(f => [f.id, f.value])
                    ))}
                </div>
            )}
        </div>
    );
};