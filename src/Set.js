const Set = (props) => {
  const set = props.set;

  return (
    <div className="setView" key={set.Id}>
      <p>Weight {set.Weight}</p>
      <p>Number of Reps{set.NumberOfReps}</p>
    </div>
  );
};

export default Set;
