interface FilterProps {
    onFilterChange: (filter: string) => void; 
  }
  
  export default function Filter({ onFilterChange }: FilterProps) {
    return (
      <div className="field is-grouped is-grouped-centered">
        <div className="control is-expanded">
          <button className="button is-purple is-fullwidth" onClick={() => onFilterChange('weekly')}>
            Weekly
          </button>
        </div>
  
        <div className="control is-expanded">
          <button className="button is-purple is-fullwidth" onClick={() => onFilterChange('monthly')}>
            Monthly
          </button>
        </div>
  
        <div className="control is-expanded">
          <button className="button is-purple is-fullwidth" onClick={() => onFilterChange('all')}>
            All
          </button>
          <br/>
        </div>
      </div>
    );
  }