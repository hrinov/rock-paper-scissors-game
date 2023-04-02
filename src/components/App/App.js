import './style.sass';
import './media.sass';
import ScoreBox from '../ScoreBox/ScoreBox';
import ResultsTable from '../ResultsTable/ResultsTable';
import GameTable from '../GameTable/GameTable';
import RulesAndSettings from '../RulesAndSettings/RulesAndSettings';
function App() {
  return (
    <div className="main-wrapper">
      <ScoreBox />
      <ResultsTable />
      <GameTable />
      <RulesAndSettings />
    </div>
  );
}
export default App;
